import { ComponentProps } from 'react';
import {
  Root as DialogPrimitiveRoot,
  Trigger as DialogPrimitiveTrigger,
  Portal as DialogPrimitivePortal,
  Close as DialogPrimitiveClose,
  Overlay as DialogPrimitiveOverlay,
  Content as DialogPrimitiveContent,
  Title as DialogPrimitiveTitle,
  Description as DialogPrimitiveDescription,
} from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '@/shared/lib/tw-utils';

function Dialog({ ...props }: ComponentProps<typeof DialogPrimitiveRoot>) {
  return (
    <DialogPrimitiveRoot
      data-slot="dialog"
      {...props}
    />
  );
}

function DialogTrigger({ ...props }: ComponentProps<typeof DialogPrimitiveTrigger>) {
  return (
    <DialogPrimitiveTrigger
      data-slot="dialog-trigger"
      {...props}
    />
  );
}

function DialogPortal({ ...props }: ComponentProps<typeof DialogPrimitivePortal>) {
  return (
    <DialogPrimitivePortal
      data-slot="dialog-portal"
      {...props}
    />
  );
}

function DialogClose({ ...props }: ComponentProps<typeof DialogPrimitiveClose>) {
  return (
    <DialogPrimitiveClose
      data-slot="dialog-close"
      {...props}
    />
  );
}

function DialogOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitiveOverlay>) {
  return (
    <DialogPrimitiveOverlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({ className, children, ...props }: ComponentProps<typeof DialogPrimitiveContent>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitiveContent
        data-slot="dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitiveClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitiveClose>
      </DialogPrimitiveContent>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitiveTitle>) {
  return (
    <DialogPrimitiveTitle
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitiveDescription>) {
  return (
    <DialogPrimitiveDescription
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
