import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

const Loading = () => {
  return (
    <div className="mx-auto max-w-[500px]">
      <div className="flex w-full flex-col gap-6 p-5">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <Skeleton className="h-9 w-[150px]"></Skeleton>
          </TabsList>
          <TabsContent value="sign-in">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-4 w-16"></Skeleton>
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-40"></Skeleton>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-12"></Skeleton>
                  <Skeleton className="h-9 w-full"></Skeleton>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-12"></Skeleton>
                  <Skeleton className="h-9 w-full"></Skeleton>
                </div>
              </CardContent>

              <CardFooter className="mt-4 flex-col gap-7">
                <Skeleton className="h-9 w-full"></Skeleton>
                <Skeleton className="h-9 w-full"></Skeleton>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Loading;
