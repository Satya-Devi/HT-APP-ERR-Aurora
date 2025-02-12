import { createClient } from "@/utils/supabase/server";
import {
  Button,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/navigation";
import classes from "./Navbar.module.css";
import {
  IconBookmark,
  IconBookmarks,
  IconBrandWindows,
  IconEye,
  IconNews,
  IconNotebook,
  IconSearch,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";

export async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <>
      <Link href="/" style={{ textDecoration: "none", cursor: "pointer" }}>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className={classes.logo}
        />
      </Link>

      <Group align="center" h="100%" visibleFrom="sm">
        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <MenuTarget>
            <Text className={classes.link} style={{ cursor: "pointer" }}>
              Insights
            </Text>
          </MenuTarget>
          <MenuDropdown ml={`90px`} className={classes.menuDropdown}>
            <MenuItem className={classes.MenuItem}>
              <Link href="/news" style={{ textDecoration: "none" }} title="Microsoft Tech News">
                <div className={classes.menuItemContent}>
                  <div className={classes.iconWrapper}>
                    <IconNews size={24} className={classes.icon} />
                  </div>
                  <div className={classes.textContent}>
                    <Text className={classes.title}>News</Text>
                    <Text className={classes.description}>
                      Stay up to date on what's happening in the Microsoft
                      ecosystem
                    </Text>
                    <Text className={classes.learnMore}>Learn more</Text>
                  </div>
                </div>
              </Link>
            </MenuItem>
            <MenuItem className={classes.MenuItem}>
              <Link href="/perspectives" style={{ textDecoration: "none" }} title="Career Insights and Microsoft Tech Trends">
                <div className={classes.menuItemContent}>
                  <div className={classes.iconWrapper}>
                    <IconEye size={24} className={classes.icon} />
                  </div>
                  <div className={classes.textContent}>
                    <Text className={classes.title}>Perspectives</Text>
                    <Text className={classes.description}>
                      Read articles and blogs by experienced professionals
                    </Text>
                    <Text className={classes.learnMore}>Learn more</Text>
                  </div>
                </div>
              </Link>
            </MenuItem>
            <MenuItem className={classes.MenuItem}>
              <Link href="/partners" style={{ textDecoration: "none" }} title="Explore Microsoft Partners">
                <div className={classes.menuItemContent}>
                  <div className={classes.iconWrapper}>
                    <IconBrandWindows size={24} className={classes.icon} />
                  </div>
                  <div className={classes.textContent}>
                    <Text className={classes.title}>Microsoft Partners</Text>
                    <Text className={classes.description}>
                      Get to know about consulting companies in the Microsoft
                      ecosystem
                    </Text>
                    <Text className={classes.learnMore}>Learn more</Text>
                  </div>
                </div>
              </Link>
            </MenuItem>
          </MenuDropdown>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <MenuTarget>
            <Text className={classes.link} style={{ cursor: "pointer" }}>
              Learn
            </Text>
          </MenuTarget>
          <MenuDropdown ml={`2px`} className={classes.menuDropdown}>
            <MenuItem className={classes.MenuItem}>
              <Link href="/roles" style={{ textDecoration: "none" }} title="Explore Career Paths and Certifications">
                <div className={classes.menuItemContent}>
                  <div className={classes.iconWrapper}>
                    <IconUsers size={24} className={classes.icon} />
                  </div>
                  <div className={classes.textContent}>
                    <Text className={classes.title}>Roles</Text>
                    <Text className={classes.description}>
                      Everything you need to know about different job roles in
                      the Microsoft ecosystem
                    </Text>
                    <Text className={classes.learnMore}>Learn more</Text>
                  </div>
                </div>
              </Link>
            </MenuItem>
            <MenuItem className={classes.MenuItem}>
              <Link href="/career-services" style={{ textDecoration: "none" }} title="Grow Your Career with HappyTechies">
                <div className={classes.menuItemContent}>
                  <div className={classes.iconWrapper}>
                    <IconNotebook size={24} className={classes.icon} />
                  </div>
                  <div className={classes.textContent}>
                    <Text className={classes.title}>Resources</Text>
                    <Text className={classes.description}>
                      Directory of the free and paid resources to help you grow
                      professionally
                    </Text>
                    <Text className={classes.learnMore}>Learn more</Text>
                  </div>
                </div>
              </Link>
            </MenuItem>
          </MenuDropdown>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <MenuTarget>
            <Text className={classes.link} style={{ cursor: "pointer" }}>
              Jobs
            </Text>
          </MenuTarget>
          <MenuDropdown
            ml={`-10px`}
            w={`465px`}
            className={classes.menuDropdown}
          >
            <MenuItem className={classes.MenuItem}>
              <Link href="/jobs" style={{ textDecoration: "none" }} title="Microsoft Tech Job Listings">
                <div className={classes.menuItemContent}>
                  <div className={classes.iconWrapper}>
                    <IconSearch size={24} className={classes.icon} />
                  </div>
                  <div className={classes.textContent}>
                    <Text className={classes.title}>Job Search</Text>
                    <Text className={classes.description}>
                      Quickly find the latest and the most relevant jobs
                    </Text>
                    <Text className={classes.learnMore}>Learn more</Text>
                  </div>
                </div>
              </Link>
            </MenuItem>
            <MenuItem className={classes.MenuItem}>
              <Link href="/tracker" style={{ textDecoration: "none" }} title="Your Saved Microsoft Career Opportunities">
                <div className={classes.menuItemContent}>
                  <div className={classes.iconWrapper}>
                    <IconBookmarks size={24} className={classes.icon} />
                  </div>
                  <div className={classes.textContent}>
                    <Text className={classes.title}>My Jobs</Text>
                    <Text className={classes.description}>
                      View all the jobs you have saved
                    </Text>
                    <Text className={classes.learnMore}>Learn more</Text>
                  </div>
                </div>
              </Link>
            </MenuItem>
          </MenuDropdown>
        </Menu>

        {user ? (
          <form action={signOut}>
            <Button
              type="submit"
              radius="md"
              size="md"
              variant="filled"
              color="#004a93"
            >
              Logout
            </Button>
          </form>
        ) : (
          <Button
            component="a"
            href="/login"
            radius="md"
            size="md"
            variant="filled"
            color="#004a93"
          >
            Login
          </Button>
        )}
      </Group>
    </>
  );
}
