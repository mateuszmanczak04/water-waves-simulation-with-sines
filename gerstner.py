import numpy as np
import matplotlib.pyplot as plt

# Parameters for the Gerstner wave
A = 1.0      # amplitude
k = 1.0      # wave number (2π / wavelength)
Q = 0.8      # steepness factor
phi = 0.0    # phase

# Generate parameter t (acts like the original x coordinate)
t = np.linspace(-np.pi * 4, np.pi * 4, 1000)

# Gerstner wave equations
x_gerstner = t + Q * A * np.cos(k * t + phi)  # horizontal displacement
y_gerstner = A * np.sin(k * t + phi)          # vertical displacement

# Plotting
plt.figure(figsize=(8, 4))
plt.plot(x_gerstner, y_gerstner, linewidth=2)
plt.title("2D Gerstner Wave Profile")
plt.xlabel("x (with horizontal displacement)")
plt.ylabel("y (vertical displacement)")
plt.grid(True)
plt.tight_layout()
plt.show()
