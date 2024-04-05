import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TTutorSignupSchema } from "@/lib/validations/auth-validation";
import { Control } from "react-hook-form";

type RegistrationFormFieldProps = {
  label: string;
  name: keyof TTutorSignupSchema;
  control: Control<TTutorSignupSchema>;
};
export default function RegistrationFormField({
  label,
  name,
  control,
}: RegistrationFormFieldProps) {
  return (
    <div className="grid gap-2">
      <FormLabel>{label}</FormLabel>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col flex-grow-1 pb-1">
            <FormControl>
              <Input {...field} />
            </FormControl>
            <div className="flex justify-end h-1">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
