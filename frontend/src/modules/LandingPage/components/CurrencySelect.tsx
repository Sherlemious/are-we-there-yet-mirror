import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "react-router";

const CurrencySelect = () => {
  const { pathname } = useLocation();

  return (
    <Select
      defaultValue={localStorage.getItem("currency") || "EGP"}
      onValueChange={(value) => {
        localStorage.setItem("currency", value);
        window.location.reload();
      }}
    >
      <SelectTrigger
        className={`${pathname === "/register" || pathname.includes("/login") ? "max-w-[200px]" : "min-w-[100px]"} rounded-xl border-2 border-accent-gold bg-accent-gold px-3 py-1 text-[20px] font-medium text-black transition-all duration-150 hover:border-accent-gold/70`}
      >
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent className="border-accent-gold bg-white">
        <SelectItem
          value="EGP"
          className="hover:bg-accent-gold hover:text-black focus:bg-accent-gold focus:text-black"
        >
          EGP
        </SelectItem>
        <SelectItem
          value="USD"
          className="hover:bg-accent-gold hover:text-black focus:bg-accent-gold focus:text-black"
        >
          USD
        </SelectItem>
        <SelectItem
          value="EUR"
          className="hover:bg-accent-gold hover:text-black focus:bg-accent-gold focus:text-black"
        >
          EUR
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
