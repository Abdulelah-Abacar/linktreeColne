import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import cloneDeep from "clone-deep";
import { connectDB } from "@/libs/conenction";

export default async function AccountPage({ searchParams }) {
  // const session = await getServerSession(authOptions);
  // const desiredUsername = searchParams?.desiredUsername;
  // if (!session) {
  //   return redirect("/");
  // }
  // await connectDB();
  // const page = await Page.findOne({ owner: session?.user?.email });

  // const leanPage = cloneDeep(page.toJSON());
  // leanPage._id = leanPage._id.toString();

  try {
    const session = await getServerSession(authOptions);
    const desiredUsername = searchParams?.desiredUsername;
    if (!session) {
      return redirect("/");
    }

    await connectDB();
    const page = await Page.findOne({ owner: session?.user?.email });

    const leanPage = page ? cloneDeep(page.toJSON()) : null;
    if (leanPage) {
      leanPage._id = leanPage._id.toString();
    }
    console.log("Lean Page:", leanPage);
    if (page) {
      return (
        <>
          <PageSettingsForm page={leanPage} user={session.user} />
          <PageButtonsForm page={leanPage} user={session.user} />
          <PageLinksForm page={leanPage} user={session.user} />
        </>
      );
    }

    return (
      <div>
        <UsernameForm desiredUsername={desiredUsername} />
      </div>
    );
  } catch (error) {
    console.error("Error in AccountPage:", error);
    // Handle error appropriately
    return <div>Something went wrong. Please try again later.</div>;
  }
}
