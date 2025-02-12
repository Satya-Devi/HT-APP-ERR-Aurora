import { SFProRounded } from "@/app/layout";
import { Container, Group, Text, Title } from "@mantine/core";
import { CardImage } from "../CardImage/CardImage";
import MainNav from "../Navbar/MainNav";
import { Navbar } from "../Navbar/Navbar";
import classes from "./Hero.module.css";
import BackButton from "../BackButton/BackButton";

type HeroProps = {
  title: string;
  subtitle: string;
  page?: string;
  align: "left" | "center" | "right";
  isHome?: boolean;
  isPartner?: boolean;
  employer_logo?: string;
  titleStyles?: React.CSSProperties;
  subtitleStyles?: React.CSSProperties;
  titleClass?: any;
  backButtonStyles?: React.CSSProperties;
};

export function Hero({
  title,
  subtitle,
  page = "",
  align,
  isHome = false,
  isPartner = false,
  employer_logo = "",
  titleStyles = {},
  subtitleStyles = {},
  titleClass,
  backButtonStyles = {},
}: HeroProps) {
  const containerClass = isHome ? classes.heroWrapper : classes.wrapper;

  console.log(titleClass);

  return (
    <Container
      className={`${containerClass} ${SFProRounded.className}`}
      fluid
      px={isHome ? "xl" : undefined}
    >
     
        <MainNav>
          <Navbar />
        </MainNav>
     

      {!isHome &&
        
          <div className={classes.inner}>
            <BackButton BackButtonStyles={backButtonStyles} />
            {isPartner ? (
              <Group ml="30px">
                <CardImage employer_logo={employer_logo} />
              </Group>
            ) : (
              <>
                <Title
                  ta={align}
                  className={`${SFProRounded.className} ${classes.titleStyle}`}
                  style={titleStyles}
                >
                  {title}
                </Title>
                <Text
                  ta={align}
                  className={classes.subtitle}
                  style={subtitleStyles}
                  component="h2"
                >
                  {subtitle}
                </Text>
              </>
            )}
          </div>
        }
    </Container>
  );
}
