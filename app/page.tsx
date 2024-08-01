import { Page } from '@/components/ui/layout/Page';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { PagePagination } from '@/components/ui/PagePagination';
import { searchPosts } from '@/features/post/actions/searchPosts';
import { PostSearchSchema, type PostSearchParams } from '@/features/post/actions/validators/postSearchSchema';
import { PostCreateButton } from '@/features/post/components/PostCreateButton';
import { PostsCards } from '@/features/post/components/PostsCards';
import { PostSearchFilters } from '@/features/post/components/PostSearchFilters';
import { getMetadata } from '@/lib/next/metadata';
import { BubbleChart } from '@/components/chart/RadarChart';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { DynamicChart } from '@/components/chart/DynamicChart';
import { Dot } from '@/components/chart/GraphChart';
import { PieChart } from '@/components/chart/PieChart';
export const metadata = getMetadata('Homepage');

export default async function HomePage({ searchParams }: PageProps<EmptyObj, PostSearchParams>) {
  const filters = PostSearchSchema.parse(searchParams);
  const data = {
    data: [
      {
        name: 'Item 1',
        quote: {
          USD: {
            market_cap: 2000000000,
          },
        },
      },
      {
        name: 'Item 2',
        quote: {
          USD: {
            market_cap: 3000000000,
          },
        },
      },
      {
        name: 'Item 3',
        quote: {
          USD: {
            market_cap: 4000000000,
          },
        },
      }
    ]
  };

  // const [posts, error] = await searchPosts(filters);

  // if (error) {
  //   return <p>{error?.message}</p>;
  // }

  return (
    <Page actions={<PostCreateButton />} className="space-y-4"  title="Charts">
      <div className="grid grid-cols-2 gap-4">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
              <DynamicChart />
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <PieChart />
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Dot  />
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <BubbleChart data={data} /> 
          </CardBody>
        </Card>
      </div>
      {/* <PostSearchFilters />
      <PostsCards posts={posts.data} />
      {!!posts.count && <PagePagination total={posts.total} />}
      <LoadMoreButton defaultLimit={filters.limit} max={posts.total} /> */}
    </Page>
  );
}
