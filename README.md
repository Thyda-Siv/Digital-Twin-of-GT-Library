# Digital-Twin-of-GT-Library

## Project Overview

This project focused on creating a functional Digital Twin (DT) for the Price Gilbert Memorial Library at Georgia Tech to support Facilities Management (FM) and Operations. Using advanced tools like Faro laser scanning, Autodesk Revit, and WireTwin, the project captured real-world data, built a comprehensive BIM model, and implemented a virtual, interactive platform to monitor, maintain, and optimize building systems.


## Project Requirements
1. Perform laser scanning (reality capture) for geometric accuracy
2. Create a BIM model integrating architectural, mechanical, electrical, and plumbing (MEP) systems
3. Load the BIM into WireTwin for DT development
4. Define and assign key equipment and populate its properties
6. Integrate Building Automation System (BAS) features with real-time data simulation (including alerts and monitoring)


## Video Demo

[![Watch the demo video]([https://img.youtube.com/vi/aH_DdPCd3Rc/0.jpg)](https://www.youtube.com/watch?v=aH_DdPCd3Rc](https://www.youtube.com/watch?v=42Uqbr8NnDM)  
*Click on the image to view the video.*

## Detailed Setup Guide
1.  Laser Scanning (Reality Capture)
- Deployed Faro laser scanners with targets (checkerboards, spheres)
- Captured overlapping scans for full floor coverage
- Registered and cleaned point cloud using Faro Scene
- Exported to Autodesk Recap for Revit integration
2. BIM Model Creation
- Modeled architectural elements: walls, floors, ceilings, doors, windows, stairs
- Modeled MEP systems based on site inventory and floorplans
- Set up properties on each equipment (OMNICLASS_SYSTEM, OMNICLASS_TYPE, AugmentID_Type, AugmentID_Instance, and Space-instance) and applied value from Omniclass Table 23 for each equipment type

Example for Electrical Lighting
    
    Property Name: OMNICLASS_SYSTEM; Property Value: 21-04 50 Electrical; Group Property Under: General; Property Type: Text
    
    Property Name: OMNICLASS_TYPE; Property Value: 23-35 47 00 Electrical Lighting, Group Property Under: General; Property Type: Text
    
    Property Name: AugmentID_Type; Possible Values: Leave empty; Group Property Under: General; Property Type: Text
    
    Property Name: AugmentID_Instance; Possible Values: Leave empty; Group Property Under: Title Text; Property Type: Text
    
    Property Name: Space-Instance; Possible Values: Leave empty; Group Property Under: Title Text; Property Type: Text
3. Digital Twin Setup in WireTwin
- Uploaded Revit model into WireTwin
- Populated properties: manufacturer, model, installation date, performance specs, maintenance intervals
- Attached documentation (O&M manuals, cut sheets, warranties)
4. Maintenance & Operations Integration
- Created equipment-based maintenance schedules (preventive + reactive tasks)
- Set up automated notifications, resource allocation, and mobile technician access
- Simulated equipment performance data and BAS integration

## Digital Twin Demo of BAS (Building Automation Sytem)
1. AHU (Air Handling Unit): Monitors airflow, temperature, and humidity levels, with performance and fault alerts
2. Drinking Fountain: Monitors usage rates and maintenance requirements
3. Electrical Distribution Panel Board: Displays load status, energy consumption, and fault detection
4. Elevator: Displays operational status, load, and maintenance logs
5. Generator: Shows real-time operational status, fuel levels, and maintenance needs
6. Lighting: Monitors energy use, on/off status, and integrates occupancy-based controls
7. Temperature Sensor:Tracks ambient temperature; triggers alerts on deviation
8. Transformer: (Assumed added) Tracks power conversion performance and alerts
9. Water Closet: Tracks plumbing status and maintenance schedules
10. Water Pressure System: Monitors building water pressure stability, flow rate, system performance and pump operation history.


