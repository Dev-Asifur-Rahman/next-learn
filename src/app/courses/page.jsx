import AllCourses from '@/components/AllCourses';
import React from 'react';

export const metadata = {
    title : 'Courses'
}

const page = async() => {
    return (
        <div>
           <AllCourses></AllCourses> 
        </div>
    );
};

export default page;