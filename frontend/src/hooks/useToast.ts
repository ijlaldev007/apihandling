import { toast } from "sonner";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  return {
    toast: (options: ToastOptions) => {
      const { title, description, variant, duration } = options;

      if (variant === 'destructive') {
        toast.error(title, {
          description,
          duration: duration || 5000,
        });
      } else {
        toast(title, {
          description,
          duration: duration || 5000,
        });
      }
    },
  };
}
