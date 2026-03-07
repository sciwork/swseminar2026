import { Metadata } from "next";
import { Fragment } from "react";
import teams from "@/configurations/teams";
import Article from "@/components/Article";
import Avatar from "@/components/Avatar";

export const metadata: Metadata = {
  title: "About",
};

const Page = () => {
  return (
    <Article>
      {teams.map((subTeam) => (
        <Fragment key={subTeam.title}>
          {subTeam.title && <h1>{subTeam.title}</h1>}
          <section className="tw:mb-16 tw:grid tw:grid-flow-row tw:grid-cols-1 tw:justify-items-center tw:gap-4 tw:md:grid-cols-2 tw:xl:mb-32 tw:xl:grid-cols-3 tw:2xl:grid-cols-4">
            {subTeam.members.map((member) => (
              <Avatar
                key={member.name}
                image={member.image}
                name={member.name}
                email={member.email}
              />
            ))}
          </section>
        </Fragment>
      ))}
    </Article>
  );
};

export default Page;
