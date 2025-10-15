import React, { useRef, useEffect, useState } from "react";
import { Typography, Card, Row, Col } from "antd";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { useSelector } from "react-redux";
import AiFooter from "../../components/User/Footer";
import { socket } from "../../socket.io/socketclient";

const { Title, Paragraph } = Typography;

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const globeRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [arcsData, setArcsData] = useState([]);

  const userId = user?._id

   useEffect(() => {
    if(userId){
      socket.auth = {userId: userId}
      socket.connect()
      socket.emit("joinRoom", userId)
      console.log("✅ Socket connected for:", userId);
    }
  
    return () => {
      socket.disconnect()
        console.log("🔌 Socket disconnected");
    }
  }, [userId])

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: window.innerHeight * 0.6,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
    }
  }, []);

  useEffect(() => {
    const connections = Array.from({ length: 40 }).map(() => ({
      startLat: Math.random() * 180 - 90,
      startLng: Math.random() * 360 - 180,
      endLat: Math.random() * 180 - 90,
      endLng: Math.random() * 360 - 180,
      color: ["#00ffff", "#ff00ff", "#00ff00"][Math.floor(Math.random() * 3)],
    }));
    setArcsData(connections);
  }, []);

  const onGlobeReady = () => {
    const globe = globeRef.current;
    if (!globe) return;
    const scene = globe.scene();

    const meteorCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];

    for (let i = 0; i < meteorCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      positions.push(x, y, z);
      velocities.push(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      );
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    const material = new THREE.PointsMaterial({
      color: "#ffffff88",
      size: 1.5,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animateMeteors = () => {
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < meteorCount; i++) {
        const idx = i * 3;
        pos[idx] += velocities[idx];
        pos[idx + 1] += velocities[idx + 1];
        pos[idx + 2] += velocities[idx + 2];

        const dist = Math.sqrt(
          pos[idx] ** 2 + pos[idx + 1] ** 2 + pos[idx + 2] ** 2
        );
        if (dist > 1000) {
          pos[idx] = (Math.random() - 0.5) * 2000;
          pos[idx + 1] = (Math.random() - 0.5) * 2000;
          pos[idx + 2] = (Math.random() - 0.5) * 2000;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      requestAnimationFrame(animateMeteors);
    };

    animateMeteors();
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden rounded-lg"
      style={{ backgroundColor: "#0a1f44" }}
    >
      <div className="pt-10 px-4 text-center z-10 w-full max-w-screen-md">
        <Title
          level={1}
          style={{
            color: "#00ffff",
            fontSize: "2.5rem",
            fontWeight: "bold",
            textShadow: "0 0 25px #00ffff, 0 0 40px #00ffff",
            letterSpacing: "2px",
          }}
        >
          NovaChat AI
        </Title>

        <Paragraph
          style={{
            color: "#ffffffcc",
            fontSize: "1.1rem",
            textShadow: "0 0 10px #00ffff66",
          }}
        >
          “Connecting minds, transcending distances — welcome to the
          intelligence of tomorrow.”
        </Paragraph>

        <Title
          level={4}
          style={{
            color: "#ffffffbb",
            marginTop: "1.5rem",
            fontWeight: "bold",
            textShadow: "0 0 10px #ffffff22",
            fontSize: 30,
          }}
        >
          Welcome back,{" "}
          <span style={{ color: "#00ffff" }}>
            {user?.username
              ? user.username.charAt(0).toUpperCase() +
                user.username.slice(1)
              : "User"}
          </span>{" "}
          👋
        </Title>
      </div>

      <div
        ref={containerRef}
        className="w-full flex justify-center items-center mt-6"
        style={{ maxWidth: "100%" }}
      >
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcStroke={0.6}
          arcDashLength={0.3}
          arcDashGap={2}
          arcDashInitialGap={() => Math.random() * 5}
          arcDashAnimateTime={4000}
          arcAltitude={0.2}
          onGlobeReady={onGlobeReady}
        />
      </div>

      <div className="w-full px-6 mt-10 mb-10 max-w-7xl">
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={20}>
            <Card
              variant="borderless"
              className="shadow-xl rounded-lg h-full"
              style={{ backgroundColor: "#1e2a4a" }}
            >
              <Title level={4} style={{ color: "#00ffff" }}>
                Empower Connection
              </Title>
              <Paragraph style={{ color: "#e0e5eb" }}>
                Engage globally, build bridges, and let NovaChat AI connect you
                in real time.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={20}>
            <Card
              variant="borderless"
              className="shadow-xl rounded-lg h-full"
              style={{ backgroundColor: "#1e2a4a" }}
            >
              <Title level={4} style={{ color: "#00ffff" }}>
                Amplify Intelligence
              </Title>
              <Paragraph style={{ color: "#e0e5eb" }}>
                Leverage AI to learn, grow, and uncover insights you never
                imagined.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={20}>
            <Card
              variant="borderless"
              className="shadow-xl rounded-lg h-full"
              style={{ backgroundColor: "#1e2a4a" }}
            >
              <Title level={4} style={{ color: "#00ffff" }}>
                Secure & Trustworthy
              </Title>
              <Paragraph style={{ color: "#e0e5eb" }}>
                Your data, your rules — NovaChat AI is built with privacy in
                mind.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      <AiFooter />
    </div>
  );
};

export default UserDashboard;
