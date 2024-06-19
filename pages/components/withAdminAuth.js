import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const withAdminAuth = (WrappedComponent) => {
    return (props) => {
        const { data: session, status } = useSession()
        const router = useRouter()
        const loading = status === 'loading'

        useEffect(() => {
            if (!loading && !session && !session?.admin) {
                router.push('/api/auth/signin')
            }

        }, [loading, session, router])
        if (loading && !session?.admin) {
            return <Skeleton count={12}></Skeleton>
        }
        return <WrappedComponent {...props} />


    }
}
export default withAdminAuth