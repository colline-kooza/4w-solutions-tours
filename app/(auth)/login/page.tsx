import LoginForm from "@/components/Forms/LoginForm";


export default async function page() {
  // const session = await getServerSession(authOptions);
  // if (session) {
  //   redirect("/dashboard");
  // }
  return (
      <div className="px-4">
        <LoginForm />
      </div>
  );
}
