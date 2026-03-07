import Container from "@/components/Container";

type Props = {
  children: React.ReactNode;
};

const Article = ({ children }: Props) => {
  return (
    <Container
      as="article"
      className="tw:prose tw:mt-2 tw:mb-12 tw:max-w-none tw:tablet:mt-10 tw:tablet:mb-32 tw:prose-headings:font-yk tw:prose-headings:font-normal tw:prose-h1:text-center tw:prose-h1:text-3xl tw:prose-h1:underline tw:prose-h1:decoration-rose-400 tw:prose-h1:decoration-2 tw:prose-h1:underline-offset-4 tw:tablet:prose-h1:tracking-widest"
    >
      {children}
    </Container>
  );
};

export default Article;
