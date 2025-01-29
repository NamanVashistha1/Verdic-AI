import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Star, ArrowLeft, ArrowRight } from "lucide-react"

// Testimonial data
const testimonials = [
  {
    stars: 5,
    tag: "Legal news",
    quote:
      "It keeps me updated with the latest global legal news and industry insights. ",
    name: "El-Elyon Appahoh, Esq.",
    title: "Attorney",
    image: "https://th.bing.com/th/id/OIP.a_C9v1H7RBbVyFjU4udThgHaKX?rs=1&pid=ImgDetMain",
  },
  {
    stars: 4,
    tag: "Document Analysis",
    quote: "The document comparison provides accurate results & analysis.",
    name: "Sarah Johnson, Esq.",
    title: "Legal Consultant",
    image: "https://th.bing.com/th/id/OIP.v0k8EPA6XrsIV7kRzVfLJQHaLH?rs=1&pid=ImgDetMain",
  },
  {
    stars: 5,
    tag: "Legal Research",
    quote: "Incredible time savings on clearing legal doubts using AI-powered chatbot.",
    name: "Michael Chen",
    title: "Corporate Lawyer",
    image: "https://i.pinimg.com/736x/07/44/76/074476f844838fb2487a9d7b4d08a904.jpg",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <div className="container">
      <div className="row mb-4 align-items-center">
        <div className="col">
          <h1 className="h2 fw-bold mt-3 mb-0">
            Trusted by
            <br />
            100,000+ users
          </h1>
        </div>
        <div className="col-auto">
          <div className="d-flex gap-2">
            <button className="btn btn-light rounded-circle p-2" onClick={prevSlide} aria-label="Previous testimonial">
              <ArrowLeft size={24} />
            </button>
            <button className="btn btn-light rounded-circle p-2" onClick={nextSlide} aria-label="Next testimonial">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="d-flex transition-all"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-100 flex-shrink-0">
              <div className="card border-0 p-4" style={{ backgroundColor: "rgb(255 252 220)" }}>
                <div className="card-body">
                  <div className="d-flex mb-3 text-warning">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={20} />
                    ))}
                  </div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{ backgroundColor: "#fff", color: "#6c757d", fontWeight: "500" }}
                    >
                    {testimonial.tag}
                    </span>

                  <p className="card-text mb-4 fs-5">{testimonial.quote}</p>

                  <div className="d-flex align-items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      width={60}
                      height={60}
                    />
                    <div>
                      <h6 className="mb-1">{testimonial.name}</h6>
                      <p className="mb-0 text-muted">{testimonial.title}</p>
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

