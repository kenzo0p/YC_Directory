"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import {z} from 'zod'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const {toast} = useToast()
  const router = useRouter()
  const handleFormSubmit  = async(prevState : any , formData : FormData) => {
    try {
        const formValues = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as string,
            link: formData.get('link') as string,
            pitch: pitch,
        }
        await formSchema.parseAsync(formValues);
        const result = await createPitch(prevState , formData,pitch)
        if(result.status === "SUCCESS ") {
            toast({
                title:"Success",
                description:"Your startup pitch has been created successfully",
                variant:"destructive"
            })
            router.push(`/startup/${result._id}`)
        }
        return result;
    } catch (error) {
        if(error instanceof z.ZodError) {
            const fieldErroes = error.flatten().fieldErrors;

            setErrors(fieldErroes as unknown as Record<string , string>)
            toast({
                title:"Error",
                description:"please check your inputs try again",
                variant:"destructive"
            })

            return {...prevState , error: 'Validation failed' , status : 'ERROR'}
        }
        toast({
            title:"Error",
            description:"An unexpected error has occured",
            variant:"destructive"
        })
        return {
            ...prevState , error:'An unexpected error has occured',status : 'ERROR'
        }
    }
  }
  const [state ,formAction , isPending] = useActionState(handleFormSubmit , {error:'' , status:'INITIAL'});
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup title"
        />
        {errors.title && <p className="startup-form_errors">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_errors">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup category (Tech ,health ,Education)"
        />
        {errors.category && (
          <p className="startup-form_errors">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup IMAGE URL"
        />
        {errors.title && <p className="startup-form_errors">{errors.title}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor value={pitch} onChange={(value) => setPitch(value as string)} id="pitch" preview="edit" height={300} style={{borderRadius :20 , overflow:"hidden"}} textareaProps={{placeholder:"Briefly describe your idea and what problem it solves."}} previewOptions={{
            disallowedElements:['style']
        }}/>
        {errors.title && <p className="startup-form_errors">{errors.title}</p>}
      </div>
      <Button type="submit" disabled={isPending} className="startup-form_btn text-white">{isPending ? 'Submiting...'  : 'Submit Your Pitch'}<Send className="size-6 ml-2"/></Button>
    </form>
  );
};

export default StartupForm;