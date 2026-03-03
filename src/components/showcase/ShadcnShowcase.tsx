import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function ShadcnShowcase() {
  return (
    <div data-showcase="shadcn" className="space-y-10">
      <div className="rounded-lg border border-dashed border-violet-400/40 bg-violet-500/5 px-3 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 inline-flex items-center gap-1.5">
        <svg
          className="size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        React + shadcn/ui — interactive, composable, accessible
      </div>

      {/* Buttons */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Card */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Card</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>React Component</CardTitle>
              <CardDescription>
                Built with Radix UI primitives and Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fully accessible, composable, and interactive. Built-in keyboard
                navigation and ARIA attributes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rich Ecosystem</CardTitle>
              <CardDescription>
                40+ components, CLI tooling, theming support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dialogs, dropdowns, forms, tables, and more. Add components with
                a single CLI command.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
