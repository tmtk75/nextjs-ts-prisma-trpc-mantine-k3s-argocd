import { PrismaClient, User } from "@prisma/client";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

interface Props {
  users: User[];
}

const Home: NextPage<Props> = (props: Props) => {
  const { users } = props;
  const hello = trpc.hello.useQuery({ text: "Alice" });
  const createUser = trpc.createUser.useMutation();
  if (!hello.data) {
    return <>Loading...</>;
  }
  return (
    <>
      <div>posts.length: {users?.length}</div>
      {users?.map((p) => (
        <div key={p.id}>id: {p.id}</div>
      ))}
      <div>
        <button
          onClick={async () => {
            await createUser.mutateAsync({ name: Date.now().toString() });
          }}
        >
          create a new user
        </button>
      </div>
      <div>greeting: {hello?.data?.greeting}</div>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  prisma.$disconnect();
  return {
    props: { users },
  };
}
