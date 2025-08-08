import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchPostsdetail } from '@/features/postsSlice'

function Post() {
    const dispatch = useDispatch()
    const { posts, postDetail, error, loading } = useSelector((state) => state.posts)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [showModal, setShowModal] = React.useState(false)

    const filteredUsers = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    React.useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const handleClick = (id) => {
        dispatch(fetchPostsdetail(id)).then(() => {
            setShowModal(true)
        })
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex justify-between gap-4'>
                <div>
                    <div className='w-2xl'>
                        <h1 className='text-3xl text-center mt-4 py-4'>Posts List</h1>
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
                                <li
                                    key={index}
                                    className="flex gap-2 align-middle items-center p-3 border rounded shadow-sm cursor-pointer hover:bg-gray-50"
                                    onClick={() => handleClick(user.id)}
                                >
                                    <p className='font-semibold'>{user.id}</p>
                                    <p className='text-sm text-gray-600'>{user.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {showModal && (
                    <div
                        className="fixed inset-0 flex justify-center items-center z-50"
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                            <div className="space-y-2 mb-4">
                                <p>
                                    <span className="font-semibold text-gray-600 mr-2">User ID:</span>
                                    <span className="text-gray-800">{postDetail.userId}</span>
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-600 mr-2">ID:</span>
                                    <span className="text-gray-800">{postDetail.id}</span>
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-800 mr-2">Title:</span>
                                    <span className="text-black">{postDetail.title}</span>
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-800 mr-2">Body:</span>
                                    <span className="text-black">{postDetail.body}</span>
                                </p>
                            </div>
                            <button
                                className="bg-black text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setShowModal(false)
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Post