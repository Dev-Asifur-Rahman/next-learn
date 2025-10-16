import AllCourses from '@/components/AllCourses';

export const metadata = {
    title : 'Courses'
}

const page = async({searchParams}) => {
    return (
        <div>
           <AllCourses searchParams={searchParams}></AllCourses> 
        </div>
    );
};

export default page;