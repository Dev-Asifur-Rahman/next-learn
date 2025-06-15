import mongoDb, { collections } from '@/lib/mongoConnect';
import Link from 'next/link';
import React from 'react';

const AllCourses = async() => {
    const data = await mongoDb(collections.courses).find({}).toArray()
    return (
        <section>
            {
                data.map(course=><Link key={course?._id} href={`/courses/${course._id}`}>Details</Link>)
            }
        </section>
    );
};

export default AllCourses;