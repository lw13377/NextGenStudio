import LivingNebulaShader from "@/components/ui/living-nebula";

export default function DemoOne() {
  return <div className="app-container">
      <LivingNebulaShader />
      <div className="overlay-content">
        <h1 className="title">Living Nebula</h1>
        <p className="description">An Interactive WebGL Shader</p>
      </div>
    </div>
}
