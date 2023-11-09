const people = [
  {
    "image": "https://i.postimg.cc/jjnk2MhB/stephen-king-min.jpg",
    "name": "Stephen King",
    "genre": "Horror",
    "description": "Stephen King, the 'Master of Horror,' has left an indelible mark on the world of literature. His chilling tales, such as 'The Shining' and 'It,' have been thrilling readers for decades, making him a true icon in the horror genre."
  },
  {
    "image": "https://i.postimg.cc/k4x1FDzc/jk-rowling-min.jpg",
    "name": "J.K. Rowling",
    "genre": "Fantasy",
    "description": "J.K. Rowling is the creative genius behind the beloved 'Harry Potter' series. Her magical world of wizards and witches has enchanted readers of all ages, offering a fantastical escape into a realm of adventure and imagination."
  },
  {
    "image": "https://i.postimg.cc/PJnGTgs6/michelle-obama-min.jpg",
    "name": "Michelle Obama",
    "genre": "Memoir",
    "description": "Michelle Obama, the former First Lady of the United States, is also a gifted author. Her memoir, 'Becoming,' is a deeply personal journey that shares her experiences, values, and aspirations, inspiring readers with her wisdom and authenticity."
  },
  {
    "image": "https://i.postimg.cc/RVPPTksj/dan-brown-min.jpg",
    "name": "Dan Brown",
    "genre": "Thriller",
    "description": "Dan Brown is a bestselling author known for his thrilling and suspenseful novels. His works, including 'The Da Vinci Code' and 'Angels & Demons,' are a blend of art, history, and mystery that keeps readers on the edge of their seats."
  }
]





export default function MeetAuthors() {
  return (
    <div className="">
      <div className="px-6 py-12 mx-auto max-w-7xl lg:px-8 lg:py-24">
        <div className="space-y-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet authors</h2>

          <ul
            role="list"
            className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                  <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                    <img className="object-cover rounded-lg shadow-lg" src={person.image} alt="" />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="space-y-4">
                      <div className="text-lg font-medium space-y-1 leading-6">
                        <h3>{person.name}</h3>
                        <p className="text-accent">{person.genre} Author</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500">{person.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
