import Card from "../components/Card";
import { useAppSelector } from "../redux/hooks";

export default function About() {
  const token = useAppSelector((s) => s.auth.token);
  const user = useAppSelector((s) => s.auth.user);

  return (
    <div className="max-w-5xl mx-auto p-4 grid gap-4">
      <Card>
        <h3 className="font-medium mb-2">🟢 Technologies</h3>
        <ul className="list-disc ml-5 text-slate-600 text-sm">
          <li>TypeScript + Redux Toolkit</li>
          <li>JWT auth</li>
          <li>Private routes</li>
          <li>Tailwind for responsive UI</li>
          <li>Express API connected to MongoDB</li>
        </ul>
      </Card>
      <Card>
        <h3 className="font-medium mb-2">🚀 For Better Performance</h3>
        <ul className="list-disc ml-5 text-slate-600 text-sm">
          <li>Implement lazy loading for better performance</li>
          <li>Implement debouncing concenp in key search</li>
          <li>use useRef , useMemo, useCallback for better optimization</li>
          <li>use redux tookit for auth related caching</li>
        </ul>
      </Card>
    </div>
  );
}
