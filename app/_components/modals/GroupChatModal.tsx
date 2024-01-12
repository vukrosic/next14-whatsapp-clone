'use client';

import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { User } from '@prisma/client';

import Select from '../inputs/Select';
import Button from '../Button';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users = []
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => {
        setIsLoading(false)
        setValue('members', []);
        setValue('name', '');
      });
  }

  return (
    <div>
      <Dialog open={isOpen} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a group chat</DialogTitle>
            <DialogDescription>
              Create a chat with more than 2 people.
            </DialogDescription>
            <div className="absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
              onClick={() => onClose()}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className='z-40'>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 flex flex-col gap-y-8">
                  <Label>Name</Label>
                  <Input
                    disabled={isLoading}
                    id="name"
                    {...register("name")}
                  />
                  <Select
                    disabled={isLoading}
                    label="Members"
                    options={users.map((user) => ({
                      value: user.id,
                      label: user.username
                    }))}
                    onChange={
                      (value) => {
                        setValue('members', value, {
                          shouldValidate: true
                        })
                      }}
                    value={members}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                disabled={isLoading}
                type="button"
                secondary
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GroupChatModal;