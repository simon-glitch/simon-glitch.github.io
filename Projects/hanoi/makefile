# project name (generate executable with this name)
TARGET   = main

CPP       = g++ --std=c++17 -c
# compiling flags here
CPPFLAGS   = -Wall -I.

LINKER   = g++ -o
# linking flags here
LFLAGS   = -Wall

SOURCES  := $(wildcard *.cpp)
INCLUDES := $(wildcard *.h)
OBJECTS  := $(SOURCES:.cpp=*.o)
rm       = rm -f

$(TARGET): obj
	$(LINKER) $(TARGET) $(LFLAGS) $(OBJECTS)
	@echo "Linking complete!"

obj: $(SOURCES) $(INCLUDES)
	$(CPP) $(CPPFLAGS) $(SOURCES)
	@echo "Compilation complete!"

clean:
	@$(rm) $(TARGET) $(OBJECTS)
	@echo "Cleanup complete!"