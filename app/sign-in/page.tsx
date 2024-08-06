import { signIn } from "@/lib/auth";

export default function SignIn() {
  return (
    <main className="h-full w-full flex justify-center items-center my-12 px-4 md:px-8 text-neutral-50">
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        <label>
          Email
          <input className="text-neutral-800" name="email" type="email" />
        </label>
        <label>
          Password
          <input className="text-neutral-800" name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
    </main>
  );
}
