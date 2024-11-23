"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const stats = [
  {
    value: "hp",
    label: "HP",
  },
  {
    value: "attack",
    label: "Attack",
  },
  {
    value: "defense",
    label: "Defense",
  },
  {
    value: "special-attack",
    label: "Special Attack",
  },
  {
    value: "special-defense",
    label: "Special Defense",
  },
];

type ReceivedProps = {
  selected: string;
  setSelectedAction: (val: string) => void;
};

export function StatDropdown({ selected, setSelectedAction }: ReceivedProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selected
            ? stats.find((stat) => stat.value === selected)?.label
            : "Select stat..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search stat..." />
          <CommandList>
            <CommandEmpty>No stat found.</CommandEmpty>
            <CommandGroup>
              {stats.map((stat) => (
                <CommandItem
                  key={stat.value}
                  value={stat.value}
                  onSelect={(currentValue) => {
                    setSelectedAction(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === stat.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {stat.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
