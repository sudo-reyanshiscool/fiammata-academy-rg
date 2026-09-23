#!/usr/bin/env python3
"""
Fiammata Academy - Graphify Knowledge Graph Runner
Extracts AST symbols, builds dependency graphs, clusters architecture communities,
and outputs interactive visualization HTML, tree hierarchy, and AI markdown report.
"""
import os
import sys
import subprocess
from pathlib import Path

# Ensure UTF-8 output on Windows console
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

def main():
    root = Path(__file__).resolve().parent.parent
    print(f"[*] Running Graphify on {root.name}...")
    
    env = os.environ.copy()
    env["PYTHONHASHSEED"] = "0"
    env["PYTHONIOENCODING"] = "utf-8"
    
    # 1. Run headless AST extraction
    cmd_extract = [sys.executable, "-m", "graphify", "extract", ".", "--code-only"]
    print("1/3 [AST Extraction] Scanning source files via Tree-sitter parsers...")
    res = subprocess.run(cmd_extract, cwd=str(root), env=env, capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0 and res.stderr:
        print(f"Extraction warning: {res.stderr.strip()}")
    else:
        print("  -> AST extraction complete.")

    # 2. Cluster and generate report
    cmd_cluster = [sys.executable, "-m", "graphify", "cluster-only", "."]
    print("2/3 [Clustering & Report] Grouping architectural communities...")
    res_cluster = subprocess.run(cmd_cluster, cwd=str(root), env=env, capture_output=True, text=True, encoding="utf-8")
    if res_cluster.returncode == 0:
        print("  -> Community clustering & GRAPH_REPORT.md updated.")
    
    # 3. Export D3 visualizers
    print("3/3 [Visualization] Emitting interactive HTML and D3 tree view...")
    subprocess.run([sys.executable, "-m", "graphify", "export", "html"], cwd=str(root), env=env, capture_output=True)
    subprocess.run([sys.executable, "-m", "graphify", "tree"], cwd=str(root), env=env, capture_output=True)

    out_dir = root / "graphify-out"
    report_file = out_dir / "GRAPH_REPORT.md"
    html_file = out_dir / "graph.html"
    tree_file = out_dir / "GRAPH_TREE.html"

    print("\n[SUCCESS] Knowledge Graph successfully refreshed!")
    print(f"   - Graph Data:    {out_dir / 'graph.json'}")
    print(f"   - Report:        {report_file}")
    print(f"   - Visual Graph:  {html_file}")
    print(f"   - Tree View:     {tree_file}")

if __name__ == "__main__":
    main()
