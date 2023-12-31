import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import useDeleteAccount from "@/hooks/useDeleteAccount";
import { LoadingButton } from "@/components/common/buttons";
import ErrorMessage from "@/components/common/error-display";
import { Button } from "@/components/ui/button";

export default function DeleteAccount(): React.ReactElement {
  const { isLoading, error, deleteAccount } = useDeleteAccount();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="active:scale-95">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Delete your account Permanently!
          </DialogTitle>
        </DialogHeader>
        <div>
          This is to confirm the permanent deletion of your account. Please note
          that all associated data, including uploaded videos, will be lost
          irreversibly. Once deleted, this information cannot be recovered.
        </div>
        <ErrorMessage errorMessage={error} />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              className="active:scale-95"
              type="button"
            >
              Cancel
            </Button>
          </DialogClose>
          <LoadingButton
            isLoading={isLoading}
            text="Delete Account"
            variant={"destructive"}
            onClick={() => deleteAccount()}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
