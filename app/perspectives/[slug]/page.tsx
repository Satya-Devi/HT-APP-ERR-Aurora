import { BlogContainer } from "@/components/BlogContainer/BlogContainer";
import { Hero } from "@/components/Hero/Hero";
import {
  Card,
  CardSection,
  Container,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import classes from "./perspectives.module.css";
import BlogCard from "@/components/BlogCard/BlogCard";

const fetchPost = async (slug: string) => {
  try {
    const client = getStoryblokApi();
    if (!client) throw new Error("Failed to initialize Storyblok client");
    const response = await client.get(`cdn/stories/articles/${slug}`, {
      version: "published",
    });
    if (!response?.data?.story) {
      throw new Error("Story not found");
    }

    const recommended_response = await client.get("cdn/stories/", {
      starts_with: "articles/",
      excluding_slugs: "articles/" + response.data.story.slug,
      filter_query: {
        category: { in: response.data.story.content.category },
        published_at: { not_in: null },
      },
      per_page: 5,
    });

    return {
      story: response.data.story,
      recommendations: recommended_response.data.stories || [],
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    throw new Error("Slug parameter is required");
  }

  try {
    const { story, recommendations } = await fetchPost(params.slug);

    if (!story) {
      throw new Error("Story not found");
    }

    return (
      <>
        {/* <head>
          <title>{story.content.title}</title>
          <meta name="description" content={story.content.description} />
        </head> */}
        <Hero
          title={story.content.title}
          subtitle="Perspectives"
          align="center"
        />
        <Container size="xl">
          <BlogContainer>
            <StoryblokStory story={story} />
          </BlogContainer>
        </Container>
        <Container mt={50}>
          {recommendations.length ? (
            <>
              <Title ta="left" order={1} pb="md">
                Similar Perspectives
              </Title>
              <SimpleGrid
                cols={{ base: 1, md: 2 }}
                verticalSpacing="lg"
                spacing="lg"
              >
                {recommendations.map((post: any) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </SimpleGrid>
            </>
          ) : null}
        </Container>
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}
