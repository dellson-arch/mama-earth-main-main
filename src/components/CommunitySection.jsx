import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Users, MessageSquare, Award, Leaf, Share2 } from "lucide-react"
import { Button } from "./ui/Button"

const CommunitySection = () => {
  const communityStats = [
    { icon: <Users className="h-12 w-12 text-green-400" />, value: "150K+", label: "Happy Members" },
    { icon: <MessageSquare className="h-12 w-12 text-blue-400" />, value: "20K+", label: "Discussions" },
    { icon: <Award className="h-12 w-12 text-purple-400" />, value: "500+", label: "Events & Workshops" },
    { icon: <Leaf className="h-12 w-12 text-yellow-400" />, value: "1M+", label: "Trees Planted" },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      quote:
        "Being part of the MamaEarth community has transformed my skincare routine and connected me with like-minded individuals. The tips and support are invaluable!",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Rahul Singh",
      quote:
        "I love the focus on natural products and sustainability. The community events are always insightful, and I've learned so much about eco-friendly living.",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Anjali Devi",
      quote:
        "The MamaEarth community is a safe space to share experiences and get advice. My baby's skin issues improved so much thanks to recommendations from other moms here!",
      avatar: "/placeholder.svg?height=48&width=48",
    },
  ]

  return (
    <div className="py-12 text-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Join Our Thriving Community
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Connect with fellow natural beauty enthusiasts, share tips, and make a positive impact together.
        </p>
      </div>

      {/* Community Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityStats.map((stat, index) => (
            <Card
              key={index}
              className="glass-effect border border-gray-700/50 shadow-xl p-6 text-center flex flex-col items-center justify-center"
            >
              <div className="mb-4">{stat.icon}</div>
              <CardTitle className="text-4xl font-bold text-white mb-2">{stat.value}</CardTitle>
              <p className="text-gray-300 text-lg">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          What Our Members Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-effect border border-gray-700/50 shadow-xl p-6 flex flex-col items-center text-center"
            >
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-green-500 shadow-md"
              />
              <p className="text-lg italic text-gray-200 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-green-300">- {testimonial.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action / Join Section */}
      <section className="text-center mb-16">
        <Card className="glass-effect border border-gray-700/50 shadow-2xl p-8 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white mb-4">Ready to Join Us?</CardTitle>
            <p className="text-lg text-gray-300">
              Become a part of a growing family that believes in natural goodness and a sustainable future.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center">
              <Users className="h-5 w-5 mr-2" /> Join Now
            </Button>
            <Button
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300 font-semibold py-3 px-6 rounded-full shadow-lg shadow-green-500/10 transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center bg-transparent"
            >
              <Share2 className="h-5 w-5 mr-2" /> Share & Invite
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Forum/Discussion Teaser (Placeholder) */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Latest Discussions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="glass-effect border border-gray-700/50 shadow-xl p-6 text-left">
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Best natural remedies for dry scalp?
            </CardTitle>
            <p className="text-gray-300 text-sm mb-3">
              Looking for effective natural solutions to combat dry and itchy scalp. Any recommendations from the
              community?
            </p>
            <Button variant="link" className="text-green-400 hover:text-green-300 p-0 h-auto">
              Read More
            </Button>
          </Card>
          <Card className="glass-effect border border-gray-700/50 shadow-xl p-6 text-left">
            <CardTitle className="text-xl font-semibold text-white mb-2">
              My journey to chemical-free skincare
            </CardTitle>
            <p className="text-gray-300 text-sm mb-3">
              Sharing my experience transitioning to all-natural skincare products and the amazing results I've seen!
            </p>
            <Button variant="link" className="text-green-400 hover:text-green-300 p-0 h-auto">
              Read More
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default CommunitySection
