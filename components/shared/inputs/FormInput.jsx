import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormInput = ({ field }) => (
  <FormItem>
    <FormLabel className="capitalize">{field.name}</FormLabel>
    <FormControl>
      <Input {...field} className="bg-black/10 dark:bg-white/15" />
    </FormControl>
    <FormMessage />
  </FormItem>
)

export default FormInput
