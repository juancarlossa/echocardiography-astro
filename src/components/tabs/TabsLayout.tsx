import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { EchoForm, type EchoFormType } from "../EchoForm"
import { ToggleDarkMode } from "../ToggleDarkMode";
import { useEffect, useState } from "react";
import { EchoValues } from "../EchoValues";

type TabsLayoutProps = {
  forms: Record<string, EchoFormType[]>; // ahora cada tab puede tener varios formularios
};


export function TabsLayout ({ forms }: TabsLayoutProps) {
  const tabKeys = Object.keys(forms)

  function getInitialTab (): string {
    const stored = typeof window !== "undefined" ? window.__initialTab : null;
    return stored && tabKeys.includes(stored) ? stored : tabKeys[0];
  }

  const [tab, setTab] = useState<string>(() => getInitialTab());
  function handleTab (tab: string) {
    setTab(tab);
    localStorage.setItem("activeTab", tab)
  }

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)


  return (
    <Tabs value={tab} className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center w-full gap-x-5">
        <TabsList className="w-full justify-center items-center ">

          {tabKeys.map((tab) => (
            <TabsTrigger key={tab} value={tab} onClick={() => handleTab(tab)} className="cursor-pointer">
              {capitalize(tab)}
            </TabsTrigger>
          ))}
          <TabsTrigger value="echoValues" onClick={() => handleTab('echoValues')} className="cursor-pointer">
            {capitalize('echoValues')}
          </TabsTrigger>

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
      <TabsContent key="echoValues" value="echoValues" className="size-full flex flex-col justify-center items-center gap-5 p-5">
        <h3 className="text-2xl font-bold">{capitalize('echoValues')}</h3>
        <EchoValues forms={forms} />
      </TabsContent>
    </Tabs>
  );
}
