import mongoDb, { collections } from '@/lib/mongoConnect';
import React from 'react';
import CourseCard from './CourseCard';

const AllCourses = async() => {
    const data = await mongoDb(collections.courses).find({}).toArray()
    return (
        <section className='grid xs:grid-cols-1 ms:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6'>
            {
                data.map(course=><CourseCard course={course} key={course._id}></CourseCard>)
            }
        </section>
    );
};

export default AllCourses;