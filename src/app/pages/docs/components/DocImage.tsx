import { Image } from "@chakra-ui/image";

interface DocImageProps {
  src: string;
  alt: string;
  children?: never;
}

export const DocImage: React.FC<DocImageProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} fit="scale-down" margin="10px auto 0" />;
};
