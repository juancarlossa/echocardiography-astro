import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { EchoForm, type EchoFormType } from "../EchoForm"
import { ToggleDarkMode } from "../ToggleDarkMode";

type TabsLayoutProps = {
  forms: Record<string, EchoFormType[]>; // ahora cada tab puede tener varios formularios
};

export function TabsLayout ({ forms }: TabsLayoutProps) {
  const tabKeys = Object.keys(forms);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Tabs defaultValue={tabKeys[0]} className="w-full  h-full flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center w-full gap-x-5">
        <TabsList className="w-full justify-center items-center ">
          {tabKeys.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="cursor-pointer">
              {capitalize(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
        <ToggleDarkMode />
      </div>
      {tabKeys.map((tab) => (
        <TabsContent key={tab} value={tab} className="size-full flex flex-col justify-center items-center gap-5 p-5">
          {
            forms[tab].length > 1 ? (
              <h3 className="text-2xl font-bold">{capitalize(tab)}</h3>
            ) : null
          }
          <div className={`grid w-full gap-6 
            ${forms[tab].length === 1 ? 'grid-cols-1 lg:max-w-1/3 max-h-1/2' : ''}
            ${forms[tab].length === 2 ? 'grid-cols-2 lg:max-w-[50vw]' : ''}
            ${forms[tab].length > 2 ? 'grid-cols-3' : ''} 
            justify-center items-stretch`}>
            {forms[tab].map((form, index) => (
              <div key={index} className="flex flex-1 flex-col justify-between">
                <EchoForm data={form.data} title={form.title} isVertical={form.isVertical} />
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
