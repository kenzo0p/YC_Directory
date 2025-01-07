"use server";

import { auth } from "@/auth";
import { parseSeverActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/writeClient";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();
  if (!session) {
    return parseSeverActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });
  try {
    const startup = {
      title,
      description,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };
    const result = await writeClient.create({_type : 'startup', ...startup} );
    return parseSeverActionResponse({...result , error:"",  status : 'SUCCESS'})
  } catch (error) {
    console.log(error);
    return parseSeverActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
