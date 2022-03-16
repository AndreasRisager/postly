import Announcement from "../../components/layout/Announcement";
import Layout from "../../components/layout/Layout";
import { getAnnouncement } from "../../lib/getAnnouncement";
import { getPolicyBySlug } from "../../lib/getPolicyBySlug";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { getPolicies } from "../../lib/getPolicies";

export default function Policy({ announcement, policy }) {
  const NextLink = ({ children, href }) => {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    );
  };
  return (
    <>
      <Announcement announcement={announcement} />
      <Layout className="max-w-3xl mx-auto px-4">
        <h1 className="text-center text-2xl pt-12 pb-10 uppercase tracking-widest">
          {policy.title}
        </h1>
        <Markdown
          options={{
            overrides: {
              p: {
                props: {
                  className: "pb-10",
                },
              },
              strong: {
                props: {
                  className: "block",
                },
              },
              a: {
                component: NextLink,
              },
            },
          }}>
          {policy.content}
        </Markdown>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const policies = await getPolicies();
  const paths = policies.map((policy) => {
    return {
      params: { slug: `${policy.slug}` },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const announcement = await getAnnouncement();
  const policy = await getPolicyBySlug(params.slug);

  return { props: { announcement, policy }, revalidate: 60 };
}
