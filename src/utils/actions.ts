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