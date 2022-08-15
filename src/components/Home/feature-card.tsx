import { Card } from "flowbite-react";

interface Props {
  title: string;
  items: string[];
}
export default function FeatureCard({ title, items }: Props) {
  return (
    <div className="w-80">
      <Card>
        <h1 className="text-lg font-bold dark:text-white">{title}</h1>
        <div className="h-60 px-2 sm:h-72">
          <ul className="list-disc text-slate-800 dark:text-slate-300">
            {items.map((item, i) => (
              <li key={i} className="mt-1">
                <span className="align-middle text-xs text-slate-800 dark:text-slate-300 sm:text-sm">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
