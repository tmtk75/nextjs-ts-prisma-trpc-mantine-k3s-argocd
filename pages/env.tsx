import type { NextPage } from "next";
import { Container } from "@mantine/core";

interface Props {
  _env: string; //Record<string, string>;
}

const Home: NextPage<Props> = (props: Props) => {
  const { _env } = props;
  const env = JSON.parse(_env);
  return (
    <Container>
      <div>
        {Object.keys(env)
          .sort()
          .map((k) => {
            return (
              <li key={k}>
                {k}:{env[k]}
              </li>
            );
          })}
      </div>
    </Container>
  );
};

export default Home;

export async function getServerSideProps() {
  return { props: { _env: JSON.stringify(process.env) } };
}
