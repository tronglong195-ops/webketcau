import * as THREE from 'three';

export const COLORS = {
  // Concrete: warm gray
  concrete: '#D6D3CB',
  concreteWireframe: '#9C988D',
  
  // Rebars
  tensionSteel: '#B4232A',      // Cốt thép chịu kéo (đỏ son)
  compressionSteel: '#1E4FD8',  // Cốt thép chịu nén (xanh lam)
  stirrups: '#D97706',          // Cốt đai (cam)
  bentBar: '#7C3AED',           // Cốt xiên (tím)
  hangerSteel: '#2563EB',       // Thép giá
  
  // Analysis zones
  compressionZone: '#93C5FD',   // Vùng nén (xanh nhạt)
  tensionZone: '#FCA5A5',       // Vùng kéo (hồng nhạt)
  neutralAxis: '#EAB308',       // Trục trung hòa (vàng)
  
  // Forces & Diagrams
  momentDiagram: '#8B5CF6',
  shearDiagram: '#06B6D4',
  stressBlock: '#38BDF8',
  arrowForce: '#EF4444',
  arrowReaction: '#3B82F6',
  
  // Dimensions
  dimension: '#475569',
  dimensionText: '#1E293B'
};

export function getConcreteMaterial(isXray: boolean = false, opacity: number = 0.45) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.concrete),
    transparent: true,
    opacity: isXray ? 0.12 : opacity,
    roughness: 0.85,
    metalness: 0.1,
    depthWrite: !isXray,
    side: THREE.DoubleSide
  });
}

export function getSteelMaterial(type: 'tension' | 'compression' | 'stirrup' | 'bent' | 'hanger') {
  let color = COLORS.tensionSteel;
  if (type === 'compression') color = COLORS.compressionSteel;
  if (type === 'stirrup') color = COLORS.stirrups;
  if (type === 'bent') color = COLORS.bentBar;
  if (type === 'hanger') color = COLORS.hangerSteel;

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.65,
    roughness: 0.35
  });
}
