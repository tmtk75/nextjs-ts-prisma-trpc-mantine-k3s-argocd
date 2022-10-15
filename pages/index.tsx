import { Post, PrismaClient, User } from "@prisma/client";
import type { NextPage } from "next";

interface Props {
  users: User[];
}

const Home: NextPage<Props> = (props: Props) => {
  const { users } = props;
  return (
    <>
      <div>posts.length: {users.length}</div>
      {users.map((p) => (
        <div key={p.id}>id: {p.id}</div>
      ))}
      <div>
        <button onClick={async () => {}}>create a new user</button>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return {
    props: { users },
  };
}
