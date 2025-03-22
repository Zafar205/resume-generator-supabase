import AuthForm from "@/components/AuthForm";
import { signOut } from "@/utils/actions";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const supabase = await createClient();
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    return (
      <div >
        <h1>Not Authenticated</h1>
        <Link className="justify-center" href='/auth'>Sign In</Link>
      </div>
    )

  }

  const {
    data: {
      session: { user: { user_metadata, app_metadata } }
    }
  } = session

  const { name, email, full_name, avatar_url } = user_metadata;
  const userName = full_name ? `@${full_name}` : "Username not set"

  console.log(session);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        {
          avatar_url && (
            <Image
              src={avatar_url}
              alt={name}
              width={200}
              height={200}
              className="rounded-full"
              quality={100} />
          )
        }
        <div>{userName}</div>
        <form action={signOut}>
          <button type="submit">
            Sign Out
          </button>
        </form>
      </div>


    </div>
  );
}
