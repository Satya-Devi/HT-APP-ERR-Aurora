"use client";

import { SFProRounded } from "@/app/layout";
import {
  Box,
  Burger,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  rem,
  
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { ReactNode } from "react";
import classes from "./Navbar.module.css";
import {
  IconBookmarks,
  IconBrandWindows,
  IconEye,
  IconNews,
  IconNotebook,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";

export default function MainNav({ children }: { children: ReactNode }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {children}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Link href="/" style={{ textDecoration: "none", cursor: "pointer" }}>
            <Image
              src="/images/logo.png"
              alt="Happy Techies"
              width={130} height={45}
              className={classes.logo_sidebar}
            />
          </Link>

          <Stack gap={40}>
            <Link
              href="/news"
              className={`${classes.link} ${SFProRounded.className} ${classes.mobileLink}`}
              title="Microsoft Tech News"
            >
              <div className={classes.menuItemContent}>
                <div className={classes.iconWrapper}>
                  <IconNews
                    size={24}
                    className={`${classes.icon} ${classes.mobileIcon}`}
                  />
                </div>
                <div className={classes.textContent}>
                  <h4 className={`${classes.title} ${classes.mobileTitle}`}>
                    News
                  </h4>
                  <p
                    className={`${classes.description} ${classes.mobileDescription}`}
                  >
                    Stay up to date on what's happening in the Microsoft
                    ecosystem
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/perspectives"
              className={`${classes.link} ${SFProRounded.className} ${classes.mobileLink}`}
              title="Career Insights and Microsoft Tech Trends"
            >
              <div className={classes.menuItemContent}>
                <div className={classes.iconWrapper}>
                  <IconEye
                    size={24}
                    className={`${classes.icon} ${classes.mobileIcon}`}
                  />
                </div>
                <div className={classes.textContent}>
                  <h4 className={`${classes.title} ${classes.mobileTitle}`}>
                    Perspectives
                  </h4>
                  <p
                    className={`${classes.description} ${classes.mobileDescription}`}
                  >
                    Read articles and blogs by experienced professionals
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/partners"
              className={`${classes.link} ${SFProRounded.className} ${classes.mobileLink}`}
              title="Explore Microsoft Partners"
            >
              <div className={classes.menuItemContent}>
                <div className={classes.iconWrapper}>
                  <IconBrandWindows
                    size={24}
                    className={`${classes.icon} ${classes.mobileIcon}`}
                  />
                </div>
                <div className={classes.textContent}>
                  <h4 className={`${classes.title} ${classes.mobileTitle}`}>
                    Microsoft Partners
                  </h4>
                  <p
                    className={`${classes.description} ${classes.mobileDescription}`}
                  >
                    Get to know about consulting companies in the Microsoft
                    ecosystem
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/roles"
              className={`${classes.link} ${SFProRounded.className} ${classes.mobileLink}`}
              title="Explore Career Paths and Certifications"
            >
              <div className={classes.menuItemContent}>
                <div className={classes.iconWrapper}>
                  <IconUsers
                    size={24}
                    className={`${classes.icon} ${classes.mobileIcon}`}
                  />
                </div>
                <div className={classes.textContent}>
                  <h4 className={`${classes.title} ${classes.mobileTitle}`}>
                    Roles
                  </h4>
                  <p
                    className={`${classes.description} ${classes.mobileDescription}`}
                  >
                    Everything you need to know about different job roles in the
                    Microsoft ecosystem
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/career-services"
              className={`${classes.link} ${SFProRounded.className} ${classes.mobileLink}`}
              title="Grow Your Career with HappyTechies"
            >
              <div className={classes.menuItemContent}>
                <div className={classes.iconWrapper}>
                  <IconNotebook
                    size={24}
                    className={`${classes.icon} ${classes.mobileIcon}`}
                  />
                </div>
                <div className={classes.textContent}>
                  <h4 className={`${classes.title} ${classes.mobileTitle}`}>
                    Resources
                  </h4>
                  <p
                    className={`${classes.description} ${classes.mobileDescription}`}
                  >
                    Directory of the free and paid resources to help you grow
                    professionally
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/jobs"
              className={`${classes.link} ${SFProRounded.className} ${classes.mobileLink}`}
              title="Microsoft Tech Job Listings"
            >
              <div className={classes.menuItemContent}>
                <div className={classes.iconWrapper}>
                  <IconSearch
                    size={24}
                    className={`${classes.icon} ${classes.mobileIcon}`}
                  />
                </div>
                <div className={classes.textContent}>
                  <h4 className={`${classes.title} ${classes.mobileTitle}`}>
                    Job Search
                  </h4>
                  <p
                    className={`${classes.description} ${classes.mobileDescription}`}
                  >
                    Quickly find the latest and the most relevant jobs
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/tracker"
              className={`${classes.link} ${SFProRounded.className} ${classes.mobileLink}`}
              title="Your Saved Microsoft Career Opportunities"
            >
              <div className={classes.menuItemContent}>
                <div className={classes.iconWrapper}>
                  <IconBookmarks
                    size={24}
                    className={`${classes.icon} ${classes.mobileIcon}`}
                  />
                </div>
                <div className={classes.textContent}>
                  <h4 className={`${classes.title} ${classes.mobileTitle}`}>
                    My Jobs
                  </h4>
                  <p
                    className={`${classes.description} ${classes.mobileDescription}`}
                  >
                    View all the jobs you have saved
                  </p>
                </div>
              </div>
            </Link>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: "30px",
              }}
            >
              <Link href="/login" className={SFProRounded.className} passHref title="Login to Happy Techies to Access Your Dashboard">
                <Button
                  radius="md"
                  size="md"
                  variant="filled"
                  color="#004a93"
                  component="a"
                  style={{
                    marginBottom: "var(--mantine-spacing-sm)",
                    width: "100px",
                  }}
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup" className={SFProRounded.className} passHref title="Sign Up Now to Explore Career Opportunities with Happy Techies">
                <Button
                  radius="md"
                  size="md"
                  variant="filled"
                  color="#004a93"
                  component="a"
                  style={{
                    marginBottom: "var(--mantine-spacing-sm)",
                    width: "100px", // Same width as the Login button
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
