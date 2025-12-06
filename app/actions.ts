'use server'

import { kv } from '@vercel/kv';
import dbConnect from '@/lib/mongodb';
import LinkModel from '@/models/Link';
import { revalidatePath } from 'next/cache';

export async function getLinks() {
  await dbConnect();
  const links = await LinkModel.find().sort({ createdAt: -1 }).lean();
  return links.map((link: any) => ({ ...link, _id: link._id.toString() }));
}

export async function saveLink(formData: FormData) {
  await dbConnect();

  const token = formData.get('token') as string;
  const destination = formData.get('destination') as string;
  const isExternalApi = formData.get('useExternal') === 'on';
  
  let finalDestination = destination;

  // External API Logic Mock
  if (isExternalApi) {
    // Yahan aap external API call laga sakte hain
    await new Promise(r => setTimeout(r, 1000)); 
    finalDestination = destination + "?ref=bot"; 
  }

  const existing = await LinkModel.findOne({ token });

  if (existing) {
    existing.history.push({ oldUrl: existing.destinationUrl });
    existing.destinationUrl = finalDestination;
    await existing.save();
  } else {
    await LinkModel.create({ token, destinationUrl: finalDestination });
  }

  // REDIS UPDATE (Instant Redirect)
  await kv.set(`link:${token}`, finalDestination);
  revalidatePath('/dashboard');
}

export async function deleteLink(token: string) {
    await dbConnect();
    await LinkModel.deleteOne({ token });
    await kv.del(`link:${token}`);
    revalidatePath('/dashboard');
}
