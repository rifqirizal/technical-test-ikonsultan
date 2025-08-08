import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchPostsdetail } from '@/features/postsSlice'

function Post() {
    const dispatch = useDispatch()
    const { posts, postDetail, error, loading } = useSelector((state) => state.posts)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [id, setId] = React.useState(null)

    const filteredUsers = posts.filter((user) =>
        user.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    React.useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    React.useEffect(() => {
        dispatch(fetchPostsdetail(id))
    }, [dispatch, id])

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex justify-between gap-4'>
                <div>
                    <div className='w-2xl'>
                        <h1 className='text-3xl text-center mt-4 py-4'>User List</h1>
                        <input
                            placeholder='Searching...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='border p-2 w-full mb-4 rounded'
                        />
                        {loading && <span className='text-sm'>Loading...</span>}
                        {error && <p className="text-red-500">{error}</p>}
                        {filteredUsers.length === 0 && <span>Data not found</span>}

                        <ul className='space-y-2'>
                            {filteredUsers.map((user, index) => (
                                <div onClick={() => setId(user.id ?? "")}>
                                    <li key={index} className='flex gap-2 align-middle p-3 border rounded shadow-sm'>
                                        <p className='font-semibold'>{user.id}</p>
                                        <p className='text-sm text-gray-600'>{user.title}</p>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <span>{postDetail ? postDetail.title : ""} </span>
                </div>
            </div>
        </div>
    )
}

export default Post