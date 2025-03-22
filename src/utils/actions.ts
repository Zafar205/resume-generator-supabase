'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function SignInWithGoogle() {
    const supabase = await createClient();
    const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: auth_callback_url
        }
    });

    if (error) {
        console.error("Authentication error:", error);
        // Handle error appropriately
        return { error };
    }

    if (data.url) {
        redirect(data.url);
    }
    
    return { error: new Error("No redirect URL returned") };
}

export async function signOut(){
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/auth")
}

export async function signUpWithEmailPassword (prev :any , formData : any){
    const supabase = await createClient();
    const {data, error} = await supabase.auth.signUp({
        email : formData.get("email"),
        password : formData.get("password")
    })

    if(error){
        console.log("error",error);
        return {
            success : null,
            error : error.message,
        }
    }

    return {
        success : "Please check your Email",
        error : null
    }
}
export async function signInWithEmailPassword (prev: any, formData: any) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password")
    });

    if (error) {
        console.log("error", error);
        return {
            success: null,
            error: error.message,
        };
    }
    console.log(data);
    // Redirect to homepage after successful login
    redirect("/");
}
