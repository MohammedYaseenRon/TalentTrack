import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, Folder, Users } from 'lucide-react';


// Projects mock Data

const stats = [
  {
    label:"Total Projects",
    value:24,
    icon:Folder,
    color:"bg-blue-400"
  },
  {
    label:"Active Projects",
    value:8,
    icon:Activity,
    color:"bg-green-400"
  },{
    label:"Completed Projects",
    value:16,
    icon:CheckCircle,
    color:"bg-gray-400"
  },
  {
    label:"Team Members",
    value:12,
    icon:Users,
    color:"bg-purple-400"
  }
]

export default function JobSeeker() {
  return (
    <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-2'>
      {stats.map((stat) => (
        <Card key={stat.label} className={`${stat.color} border-none`}>
          <CardHeader className='flex items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-white text-lg font-bold'>
              {stat.label}
            </CardTitle>
            <stat.icon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-lg font-bold'>{stat.value }</div>
          </CardContent>

        </Card>
      ))}

    </div>
  );
}
